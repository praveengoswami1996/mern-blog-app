import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTwitter, FaGithub, FaLinkedin } from "react-icons/fa";

const FooterLinks = [
  { 
    title: "ABOUT", 
    links: [
      { label: "Devv's Blog", href: "/about" }
    ] 
  },
  { 
    title: "FOLLOW US", 
    links: [
      { label: "Github", href: "#" },
      { label: "LinkedIn", href: "#" }
    ] 
  },
  { 
    title: "LEGAL", 
    links: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms & Conditions", href: "#" }
    ] 
  }
]


const Footer = () => {
  return (
    <footer className="m-[1px] border-t-8 border rounded-xl border-indigo-700 p-8">
      <div>
        <div className="flex justify-between pb-8 border-b border-gray-300">
          <div>
            <Link to={"/"}>
              <span className="px-3 py-1 bg-indigo-500 text-white text-xl font-bold rounded-md">
                Devv&apos;s
              </span>
              <span className="text-xl font-semibold">Blog</span>
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:mt-4 sm:grid-cols-3 sm:gap-6">
            {FooterLinks.map((item, index) => {
              return (
                <div key={index} className="flex flex-col gap-6">
                  <h5 className="text-lg font-medium">{ item.title }</h5>
                  <div className="flex flex-col gap-4 text-sm">
                    {item.links.map((item, index) => {
                      return (
                        <Link key={index} href={item.link}>
                          { item.label }
                        </Link>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="mt-5">
          <div className="flex items-center justify-between gap-5">
            <div>
              <span>
                &copy; 2024 Devv&apos;s Blog
              </span>
            </div>
            <div className="flex items-center gap-5 text-2xl">
              <FaFacebook />
              <FaInstagram />
              <FaTwitter />
              <FaGithub />
              <FaLinkedin />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer