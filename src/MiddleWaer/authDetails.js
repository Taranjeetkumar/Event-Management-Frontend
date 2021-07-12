import {getMethod} from '../Services/APIServices';
import {getCookies} from '../Services/Cookies';
const authDetails=async()=>{
    let user = false;
    if(getCookies('USER_TOKEN'))
    {
        await getMethod('/api/v1/user/me').then(response => {
            if(response.success)
            {
                  user = response.data;
            }else{
            }
        })
    }
    return user;
}
export {authDetails};