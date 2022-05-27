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
        { path: '/app/monitors', title: 'Monitor', icon: 'fas fa-tv', id: 'mornitor' },
        { path: '/app/chats', title: 'Chat', icon: 'far fa-envelope', id: 'chat' },
        {
          title: 'Setting',
          icon: 'fas fa-cog',
          id: 'setting',
          routes: [
            { path: '/app/partners', title: 'Anime', icon: 'far fa-handshake', id: 'partners' },
            { path: '/app/users', title: 'Studio', icon: 'far fa-user', id: 'users' },
            { path: '/app/line', title: 'Actor', icon: 'fab fa-line', id: 'line_oa' },
            { path: '/app/resolve', title: 'Song', icon: 'far fa-folder', id: 'job_type' }
          ]
        }
      ]
    return(
        <div className="app-sidebar">
            <div className="routes">
            <List sx={{ width: '100%', maxWidth: 360 }} component="nav">

            </List>
            </div>
        </div>
    )
}
export default SideBar