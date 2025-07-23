import logo from "../../assets/images/logo.svg"

function Header() {
  return (
    <div className="w-full h-100 absolute bg-black">
      <img src={logo} alt="Logo" className="w-129 h-60 left-8 top-22 ml-[32px] mt-20" />
      <div className="left-[190px] top-[35px] absolute text-primary text-2xl font-bold">
        Ticket Manager
      </div>
    </div>
  )
}

export default Header
