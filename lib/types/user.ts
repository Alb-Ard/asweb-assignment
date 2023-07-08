import Owner from "./owner";

interface User extends Owner {
    readonly email: string,
}

export default User;