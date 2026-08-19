import { Typography } from "@material-tailwind/react"

const REPO_URL = "https://github.com/bryanherdianto/culinaize"

const LINKS = [
  {
    title: "Pages",
    items: [
      { name: "Home", href: "/" },
      { name: "Chat", href: "/chat" },
      { name: "Login", href: "/login" },
      { name: "About Us", href: "/about" },
      { name: "Team", href: "/team" },
      { name: "Contact Us", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    items: [
      { name: "Terms", href: "/terms" },
      { name: "Privacy", href: "/privacy" },
    ],
  },
  {
    title: "Project",
    items: [
      { name: "Source Code", href: REPO_URL },
      { name: "Report an Issue", href: `${REPO_URL}/issues` },
    ],
  },
]

const CURRENT_YEAR = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="px-8 pt-24 pb-8">
      <div className="container max-w-6xl flex flex-col mx-auto">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-3 md:gap-36">
          {LINKS.map(({ title, items }) => (
            <ul key={title}>
              <Typography variant="h6" color="blue-gray" className="mb-4">
                {title}
              </Typography>
              {items.map(({ name, href }) => {
                const isExternal = href.startsWith("http")
                return (
                  <li key={name}>
                    <Typography
                      as="a"
                      href={href}
                      target={isExternal ? "_blank" : undefined}
                      rel={isExternal ? "noreferrer noopener" : undefined}
                      className="py-1 font-normal !text-gray-700 transition-colors hover:!text-gray-900"
                    >
                      {name}
                    </Typography>
                  </li>
                )
              })}
            </ul>
          ))}
        </div>
        <Typography color="blue-gray" className="md:text-center mt-16 font-normal !text-gray-700">
          &copy; {CURRENT_YEAR} CulinAIze. All Rights Reserved.
        </Typography>
      </div>
    </footer>
  )
}

export default Footer
