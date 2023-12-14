import { connectToDatabase } from '@/utils/server/db'

export const paginatedGet = async (entity, paginationInfo) => {
  await connectToDatabase()
  const { filters, page, pageSize, order } = paginationInfo
  const findExpression = processFilters(filters)
  const documents = await entity
    .find(findExpression)
    .sort(order)
    .skip((page - 1) * pageSize)
    .limit(pageSize)
    .lean()
  const rowCount = await entity.find(findExpression).count()

  return paginatedResponse(paginationInfo, documents, rowCount)
}

export const paginatedAggregate = async (entity, paginationInfo, pipeline) => {
  await connectToDatabase()
  const rowCountPipeline = [...pipeline, { $count: 'totalRowCount' }]
  const { page, pageSize, order } = paginationInfo
  const queryPipeline = [
    ...pipeline,
    Object.keys(order).length > 0
      ? {
          $sort: order,
        }
      : null,
    {
      $skip: (page - 1) * pageSize,
    },
    {
      $limit: pageSize,
    },
  ].filter(stage => stage != null)

  const rowCountResponse = await entity.aggregate(rowCountPipeline)
  const rowCount =
    rowCountResponse && rowCountResponse.length > 0
      ? rowCountResponse[0].totalRowCount
      : 0
  const documents = await entity.aggregate(queryPipeline)

  return paginatedResponse(paginationInfo, documents, rowCount)
}

export const extractPaginationInfoFromQuery = req => {
  const filters = {}
  let order = {}
  let page = 1
  let pageSize = 100
  Object.entries(req.query).forEach(([key, value]) => {
    switch (key) {
      case 'page':
        page = Math.max(1, value)
        break
      case 'pageSize':
        pageSize = Math.max(1, value)
        break
      case 'order':
        order = orderQueryToObject(value)
        break
      default:
        filters[key] = value
    }
  })
  return { page, pageSize, filters, order }
}

export const processFilters = filters => {
  // console.log('ORIGINAL FILTERS', filters)
  filters = Object.fromEntries(
    Object.entries(filters).map(([k, v]) => {
      const exp = processExpression([k, v], false)
      return exp
    })
  )
  // console.log('FILTERS', JSON.stringify(filters, null, 2))
  return filters
}

const processExpression = ([k, v], returnObject = false) => {
  // console.log('process expr', k, v, returnObject)
  switch (k.toLowerCase()) {
    case 'or':
      k = '$or'
      v = processExpressionValue(v, true)
      break
    case 'and':
      k = '$and'
      v = processExpressionValue(v, true)
      break
    default:
      v = valueToRegex(v)
  }
  // console.log('#2', k, v)
  // console.log('#3', k, v)
  return returnObject ? { [k]: v } : [k, v]
}

export const splitOnFirst = (str, keys) => {
  const indicies = keys.map(key => str.indexOf(key))
  const firstIndex = Math.min(...indicies.filter(i => i >= 0))
  const keyIndex = indicies.indexOf(firstIndex)
  const firstKey = keys[keyIndex]
  let a = str.substring(0, firstIndex)
  let b = str.substring(firstIndex + firstKey.length, str.length)
  return [a, b, firstKey]
}

const splitByCommasIgnoreParenthesis = str => {
  let result = []
  let parenthesesCount = 0
  let currentChunk = ''

  for (let i = 0; i < str.length; i++) {
    const currentChar = str[i]

    if (currentChar === '(') {
      parenthesesCount++
    } else if (currentChar === ')') {
      parenthesesCount--
    }

    if (currentChar === ',' && parenthesesCount === 0) {
      result.push(currentChunk.trim())
      currentChunk = ''
    } else {
      currentChunk += currentChar
    }
  }

  result.push(currentChunk.trim())
  return result
}

const processExpressionValue = (str, returnArray = false) => {
  str = removeParenthesis(str)
  const parts = splitByCommasIgnoreParenthesis(str)
  if (parts.length > 1) {
    return parts.map(p => {
      p = removeParenthesis(p)
      let [k, v, op] = splitOnFirst(p, ['!=', '='])
      v = removeParenthesis(v)
      switch (k.toLowerCase()) {
        case 'or':
          k = '$or'
          v = processExpressionValue(v, true)
          break
        case 'and':
          k = '$and'
          v = processExpressionValue(v, true)
          break
      }
      v = valueToRegex(v)
      v = stringToPrimitive(v)

      const ret = objectWithOperator(k, v, op)
      return ret
    })
  }
  let [k, v, op] = splitOnFirst(parts[0], ['!=', '='])
  v = valueToRegex(v)
  v = stringToPrimitive(v)
  const obj = objectWithOperator(k, v, op)
  return returnArray ? [obj] : obj
}

const objectWithOperator = (k, v, op) => {
  switch (op) {
    case '=':
      return { [k]: stringToPrimitive(v) }
    case '!=':
      return {
        [k]: { $ne: stringToPrimitive(v) },
      }
    default:
      throw Error('Unsupported operator ' + op)
  }
}

const valueToRegex = value => {
  if (typeof value === 'string' && value.includes('*')) {
    // crude fuzzy match
    return new RegExp(value.replaceAll('*', ''), 'i')
  }
  return value
}

export const removeParenthesis = str => {
  if (str.startsWith('(') && str.endsWith(')')) {
    str = str.substring(1, str.length - 1)
  }
  return str
}

const orderQueryToObject = value => {
  const fields = value.split(',')
  const order = {}
  fields.forEach(f => {
    if (f.startsWith('-')) {
      order[f.substring(1)] = -1
    } else if (f.startsWith('+')) {
      order[f.substring(1)] = 1
    } else {
      order[f] = 1
    }
  })
  return order
}

const stringToPrimitive = v => {
  if (v === 'true' || v === 'false') return v === 'true'
  if (v === 'null') return null
  return v
}

export const paginatedResponse = (paginationInfo, data, rowCount) => {
  return {
    page: paginationInfo.page,
    pageSize: paginationInfo.pageSize,
    pageCount: Math.ceil(rowCount / paginationInfo.pageSize),
    rowCount,
    data,
  }
}
