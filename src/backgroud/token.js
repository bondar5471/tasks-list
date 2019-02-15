
const token = localStorage.getItem("token")

const config = {
    headers: {'Authorization': "bearer " + token}
  };
export {config}  