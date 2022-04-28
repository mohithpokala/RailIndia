
const Logout =()=>{
    localStorage.setItem("token","");
    window.location="/login";
};

export default Logout;