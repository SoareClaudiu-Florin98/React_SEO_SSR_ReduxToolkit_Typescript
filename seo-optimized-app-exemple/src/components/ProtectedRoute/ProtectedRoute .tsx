import React, { useEffect } from 'react'
import { useNavigate} from "react-router-dom"
import { useAppSelector } from '../../hooks/useTypedSelector';
import { RootState } from '../../store';

interface Props {
    children: React.ReactElement
    to: string
}

const ProtectedRoute: React.FC<Props> = ({children, to}) => {
    const auth = useAppSelector((state: RootState)=> {return state.auth})
    const navigate = useNavigate();

    useEffect(() => {
        if(!auth){
            navigate('../' + to)
        }
    }
    ,[])
    if(!auth){
        return null;
    }
    return children
};

export default ProtectedRoute;