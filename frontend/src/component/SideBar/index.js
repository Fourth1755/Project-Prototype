import {
    List,
    ListItemButton,
    ListItemText,
    Collapse,
    Stack,
    Typography
  } from '@mui/material'

const SideBar=()=>{
    const routes = [
        { path: '/app/anime', title: 'Anime', id: 'anime' },
        { path: '/app/studio', title: 'Studio', id: 'studio' },
        // {
        //   title: 'Setting',
        //   icon: 'fas fa-cog',
        //   id: 'setting',
        //   routes: [
        //     { path: '/app/partners', title: 'Anime', icon: 'far fa-handshake', id: 'partners' },
        //     { path: '/app/users', title: 'Studio', icon: 'far fa-user', id: 'users' },
        //     { path: '/app/line', title: 'Actor', icon: 'fab fa-line', id: 'line_oa' },
        //     { path: '/app/resolve', title: 'Song', icon: 'far fa-folder', id: 'job_type' }
        //   ]
        // }
      ]
    return(
        <div className="app-sidebar">
            <div className="routes">
            <List sx={{ width: '100%', maxWidth: 360 }} component="nav">
              {routes.map((route,i)=>(
                <ListItemButton>
                  <div>
                    <ListItemText primary={route.title}/>
                  </div>
                </ListItemButton>
              ))}
            </List>
            </div>
        </div>
    )
}
export default SideBar