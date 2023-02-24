import { useEffect } from 'react';
import { RootState } from '../store';
import { useAppDispatch, useAppSelector } from '../hooks/useTypedSelector';
import { fetchAdmins } from '../services/adminService';

const AdminsListPage =() => {

    const admins = useAppSelector((state: RootState)=> {return state.admin})

    const dispatch = useAppDispatch();
    useEffect(() => {
        if(admins.adminsList.length ==0){
            dispatch(fetchAdmins());
        }
    },[]);

    const renderAdmins = () =>{
        return admins.adminsList.map((admin:any) =>{
            return <li key={admin.id}>{admin.name}</li>
        });    
    };

    return(
        <div>
            <div>Protected list of admins</div>
            {admins.loading && <ul>{renderAdmins()}</ul>}
        </div>
    );
}
function loadAdminsList(store:any){   
    return store.dispatch(fetchAdmins());
}
export {loadAdminsList}
export default AdminsListPage;