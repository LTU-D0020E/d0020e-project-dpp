const sidelinks = {
  users: {
    name: 'Users',
    slug: '/users',
    icon: 'icon-for-users',
  },
  groups: {
    name: 'Groups',
    slug: '/groups',
    icon: 'icon-for-groups',
  },
}

export default function AdminLayout() {
  return <Main></Main>
}

function Main() {
  return (
    <div className='flex-col-2 flex'>
      <SideBar />
      <div className='w-full'>dasdasdasda</div>
    </div>
  )
}

function SideBar() {
  return (
    <div className='flex h-[1000px] w-[400px] flex-col items-center bg-blue-950'>
      <div className='h-20 bg-blue-950 text-white'>asdasdasd</div>
      <div className='w-full bg-blue-900'>
        {Object.entries(sidelinks).map(([key, { name, slug, icon }]) => (
          <a
            key={key}
            href={slug}
            className='mt-2 block font-semibold text-white'
          >
            {name}
          </a>
        ))}
      </div>
    </div>
  )
}
