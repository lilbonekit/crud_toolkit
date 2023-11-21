import { useSelector } from "react-redux"

const useAuth = () => {
    return useSelector(state => state.currentUser)
}

export default useAuth