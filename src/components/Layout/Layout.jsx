import Navbar from '../../components/Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import { Offline } from "react-detect-offline";

export default function Layout() {
  return (
    <div>
      <Navbar />
      <Offline>
        <div className='network'>
          <i class="fa fa-wifi" aria-hidden="true"></i> you are offline
        </div>
      </Offline>

        <div className="container">
          <Outlet />
        </div>

    </div>
  )
}
