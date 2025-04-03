import {
  FacebookOutlined,
  InstagramOutlined,
  MailOutlined,
  PhoneOutlined,
} from '@ant-design/icons';

export default function Navbar() {
  return (
    <div className="text-white py-8 px-24 text-3xl">
      <div className="grid grid-cols-8">
        <div className="col-span-4">
          <img src="../images/logo.png" alt="Description of image" />
        </div>
        <div className="col-span-4">
          <div className="flex justify-end ">
            <div className="flex text-lg">
              <div className="bg-[#333333] rounded-tl-full rounded-bl-full  py-2 px-4">
                <PhoneOutlined className="mr-2" />
                02-069-9966 / 089-986-9966
              </div>
              <div className="flex gap-4 items-center bg-[#8F2F34] rounded-tr-full rounded-br-full   py-2 px-4">
                <MailOutlined className="ml-2 text-2xl" />
                <FacebookOutlined className="text-2xl" />
                <InstagramOutlined className="text-2xl" />
              </div>
            </div>
          </div>
          <div className="text-black">
            <nav className="flex justify-end mt-4">
              <ul className="flex gap-8 text-lg">
                <li className="relative group">
                  <a
                    href="#"
                    className="text-gray-500 hover:text-black border-b-2 border-transparent group-hover:border-black"
                  >
                    หน้าหลัก
                  </a>
                </li>
                <li className="relative group">
                  <a
                    href="#"
                    className="text-gray-500 hover:text-black border-b-2 border-transparent group-hover:border-black"
                  >
                    บริการ
                  </a>
                </li>
                <li className="relative group">
                  <a
                    href="#"
                    className="text-gray-500 hover:text-black border-b-2 border-transparent group-hover:border-black"
                  >
                    ผลิตภัณฑ์
                  </a>
                </li>
                <li className="relative group">
                  <a
                    href="#"
                    className="text-gray-500 hover:text-black border-b-2 border-transparent group-hover:border-black"
                  >
                    ลูกค้าของเรา
                  </a>
                </li>
                <li className="relative group">
                  <a
                    href="#"
                    className="text-gray-500 hover:text-black border-b-2 border-transparent group-hover:border-black"
                  >
                    เกี่ยวกับเรา
                  </a>
                </li>
                <li className="relative group">
                  <a
                    href="#"
                    className="text-gray-500 hover:text-black border-b-2 border-transparent group-hover:border-black"
                  >
                    ติดต่อเรา
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
