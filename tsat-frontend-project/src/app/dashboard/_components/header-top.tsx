"use client";

import React, {
  Dispatch,
  FormEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { Plus, Filter } from "lucide-react";

import ImageUpload from "@/components/image-upload";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import api from "@/server/api";
import { toast } from "sonner";
import { getCookie } from "@/lib/cookie";
import InputWithLabel from "@/components/input-label";
import DelItem from "../edit-review/_components/del-item";

interface CategoryProduct {
  id: string;
  name: string;
  image: string;
  createdAt: string;
  categoryServiceId?: string;
  updatedAt: string;
}
interface CategoryService {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}

const HeaderTop = ({
  getProduct,
  setFilter,
}: {
  getProduct: () => Promise<void>;
  setFilter: Dispatch<string>;
}) => {
  const [categories, setCategories] = useState<CategoryProduct[]>([]);
  const [categoryService, setCategoryService] = useState<CategoryService[]>([]);
  const [open, setOpen] = useState(false);
  const [selectItem, setSelectItem] = useState<CategoryProduct | null>();
  const [imageChange, setImageChange] = useState<File | null>(null);
  const [dialogUp, setDialogUp] = useState(false);
  const [openService, setOpenService] = useState(false);
  const [delDialog, setDelDialog] = useState(false);
  const [data, setData] = useState({
    name: "",
    detail: "",
    categoryId: "",
  });
  const [serviceData, setServiceData] = useState({
    name: "",
    categoryServiceId: "",
  });
  const [image, setImage] = useState<File | null>(null);
  const [bgImage, setBgImage] = useState<File | null>(null);

  const fetchCategoriesService = useCallback(async () => {
    try {
      const res = await api.catagory.getCatagoryService();
      if (res.status === 200) {
        setCategoryService(res.data as CategoryService[]);
      }
    } catch (e) {
      console.error("Failed to fetch categories", e);
    }
  }, []);

  const fetchCategories = useCallback(async () => {
    try {
      const res = await api.product.getCatagoryProduct();
      if (res.status === 200) {
        setCategories(res.data.data);
      }
    } catch (e) {
      console.error("Failed to fetch categories", e);
    }
  }, []);

  useEffect(() => {
    void fetchCategories();
    void fetchCategoriesService();
  }, [fetchCategories, fetchCategoriesService]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (value: string) => {
    setData((prev) => ({ ...prev, categoryId: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const cookie = await getCookie("access_token");
    if (
      data.name === "" &&
      data.detail === "" &&
      data.categoryId === "" &&
      image === null
    ) {
      toast.error("กรุณากรอกข้อมูลให้ครบถ้วน", { className: "!text-red-500" });
    }
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("detail", data.detail);
    formData.append("categoryId", data.categoryId);
    formData.append("image", image as File);
    try {
      const res = await fetch(
        "http://150.95.26.51:3131/api/v1/product/create-product",
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${cookie}`,
          },
        }
      );
      if (res.status === 201) {
        toast.success("สร้างสินค้าสําเร็จ", { className: "!text-green-500" });
        setData({
          name: "",
          detail: "",
          categoryId: "",
        });
        getProduct();
        setOpen(false);
        setImage(null);
      } else {
        toast.error("สร้างสินค้าไม่สําเร็จ", { className: "!text-red-500" });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getCatagoryById = useCallback(async ({ id }: { id: string }) => {
    try {
      const res = await api.product.getProduct({ id });
      if (res.status === 200) {
        setSelectItem(res.data.data);
      } else {
        toast.error("ไม่สามารถ ดึงข้อมูลได้");
      }
    } catch {
      console.log("Error Getcategory");
    }
  }, []);

  const updateCategory = async (
    e: React.FormEvent<HTMLFormElement>,
    id: string
  ) => {
    e.preventDefault();
    const cookie = await getCookie("access_token");
    const formData = new FormData();
    formData.append("name", selectItem.name);
    formData.append("categoryServiceId", selectItem.categoryServiceId);
    formData.append("image", imageChange as File);
    try {
      const res = await fetch(
        `http://150.95.26.51:3131/api/v1/product/update-category/${id}`,
        {
          method: "PUT",
          body: formData,
          headers: {
            Authorization: `Bearer ${cookie}`,
          },
        }
      );
      if (res.status === 200) {
        toast.success("สร้างหมวดหมู่บริการสําเร็จ", {
          className: "!text-green-500",
        });
        fetchCategories();
        setDialogUp(false);
        setSelectItem(null);
        setImageChange(null);
      } else {
        toast.error("สร้างหมวดหมู่ไม่บริการสําเร็จ", {
          className: "!text-red-500",
        });
      }
    } catch {
      toast.error("เกิดปัญหาที่ Server");
    }
  };

  const resetProductForm = () => {
    setData({
      name: "",
      detail: "",
      categoryId: "",
    });
    setImage(null);
  };

  const resetServiceForm = () => {
    setServiceData({
      name: "",
      categoryServiceId: "",
    });
    setBgImage(null);
  };

  const createCategoryService = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const cookie = await getCookie("access_token");
    try {
      const formData = new FormData();
      formData.append("name", serviceData.name);
      formData.append("categoryServiceId", serviceData.categoryServiceId);
      formData.append("image", bgImage as File);
      const res = await fetch(
        "http://150.95.26.51:3131/api/v1/product/create-category",
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${cookie}`,
          },
        }
      );
      if (res.status === 200) {
        toast.success("สร้างหมวดหมู่บริการสําเร็จ", {
          className: "!text-green-500",
        });
        resetServiceForm();
        fetchCategoriesService();
        fetchCategories()
        setOpenService(false);
      } else {
        toast.error("สร้างหมวดหมู่บริการไม่สําเร็จ", {
          className: "!text-red-500",
        });
      }
    } catch (e) {
      console.log(e);
    }
  };


  const delOnClick = () => {
    setDelDialog(false);
    fetchCategories()
  };

  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 w-full">
      {/* Header Title */}
      <div className="flex-shrink-0">
        <h6 className="text-lg sm:text-xl font-bold text-[#333333] text-center lg:text-left">
          รายการสินค้า
        </h6>
      </div>

      {/* Controls Container */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
        {/* Filter Select */}
        <div className="w-full sm:w-[180px]">
          <Select onValueChange={(e) => setFilter(e)}>
            <SelectTrigger className="w-full h-10 sm:h-[2.5rem]">
              <div className="flex items-center gap-2">
                <Filter size={16} className="sm:hidden" />
                <SelectValue placeholder="หมวดหมู่" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>หมวดหมู่สินค้า</SelectLabel>
                <SelectItem value="all">ทั้งหมด</SelectItem>
                {categories.map((item) => (
                  <SelectItem key={item.id} value={item.name}>
                    {item.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        {/* เเก้ไข หมวดหมู่ */}
        <Dialog>
          <DialogTrigger asChild>
            <button className="flex items-center justify-center gap-2 cursor-pointer rounded-md border border-gray-300 px-4 py-2 h-10 sm:h-[2.5rem] hover:bg-gray-50 transition-colors">
              <span className="text-[#333333] text-sm font-medium">
                เเก้ไขหมวดหมู่
              </span>
              <Plus color="#333333" size={16} />
            </button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl p-4">
            <DialogTitle>เเก้ไขหมวดหมู</DialogTitle>
            {categories.map((item, index) => {
              return (
                <div key={index} className="w-full flex justify-between">
                  <span>{item.name}</span>
                  <div className="flex gap-2">
                    <Dialog>
                      <DialogTrigger>
                        <button
                          onClick={() => getCatagoryById({ id: item.id })}
                          className="text-yellow-400 underline cursor-pointer"
                        >
                          แก้ไข
                        </button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl p-4">
                        <DialogTitle>กรองข้อมูล ที่จะเเก้ไข</DialogTitle>
                        <div className="flex flex-col gap-4">
                          <InputWithLabel
                            value={selectItem?.name}
                            onChange={(e) => {
                              setSelectItem({
                                ...selectItem,
                                name: e.target.value,
                              });
                            }}
                            label="ชื่อ หมวดหมู่"
                          />
                          <div className="flex flex-col items-start gap-2">
                            <span className="text-sm font-medium">
                              หมวดหมู่บริการ
                            </span>
                            <Select
                              value={selectItem?.categoryServiceId}
                              onValueChange={(value) =>
                                setSelectItem({
                                  ...selectItem,
                                  categoryServiceId: value,
                                })
                              }
                            >
                              <SelectTrigger className="w-full h-10 sm:h-[2.5rem]">
                                <SelectValue placeholder="หมวดหมู่" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectLabel>หมวดหมู่บริการ</SelectLabel>
                                  {categoryService.map((item) => (
                                    <SelectItem
                                      key={item.id}
                                      value={item.id.toString()}
                                    >
                                      {item.title}
                                    </SelectItem>
                                  ))}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="flex flex-col items-start gap-2">
                            <span className="text-sm font-medium">
                              เเก้ไขภาพพื้นหลังจากภาพเดิม
                            </span>
                            <ImageUpload onChange={setImageChange} />
                          </div>
                        </div>
                        <button
                          onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                            updateCategory(e, item.id)
                          }
                          className="bg-yellow-500 w-full py-3 cursor-pointer hover:bg-yellow-400 rounded-lg text-white"
                        >
                          อัพเดท
                        </button>
                      </DialogContent>
                    </Dialog>
                    <Dialog open={delDialog} onOpenChange={setDelDialog}>
                      <DialogTrigger>
                        <button className="text-red-500 underline cursor-pointer">
                          ลบ
                        </button>
                      </DialogTrigger>
                      <DialogContent className="p-4 max-w-2xl">
                        <DelItem
                          apiPath="product/delete-category"
                          id={item.id}
                          onComplete={delOnClick}
                        />
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              );
            })}
          </DialogContent>
        </Dialog>

        {/* Action Buttons Container */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
          {/* Add Category Button */}
          <Dialog open={openService} onOpenChange={setOpenService}>
            <DialogTrigger asChild>
              <button
                className="flex items-center justify-center gap-2 cursor-pointer rounded-md border border-gray-300 px-4 py-2 h-10 sm:h-[2.5rem] hover:bg-gray-50 transition-colors"
                onClick={() => resetServiceForm()}
              >
                <span className="text-[#333333] text-sm font-medium">
                  เพิ่มหมวดหมู่
                </span>
                <Plus color="#333333" size={16} />
              </button>
            </DialogTrigger>
            <DialogContent className="max-w-[95vw] sm:max-w-[600px] p-4 max-h-[90vh] overflow-y-auto">
              <h6 className="text-lg font-semibold mb-4">
                เพิ่มหมวดหมู่สินค้า
              </h6>

              <form
                onSubmit={createCategoryService}
                className="flex flex-col gap-4"
              >
                <div className="flex flex-col items-start gap-2">
                  <span className="text-sm font-medium">
                    ชื่อหมวดหมู่อะไหล่
                  </span>
                  <Input
                    name="name"
                    className="w-full h-10 sm:h-[2.5rem]"
                    placeholder="ชื่อหมวดหมู่"
                    value={serviceData.name}
                    onChange={(e) =>
                      setServiceData({ ...serviceData, name: e.target.value })
                    }
                  />
                </div>
                <div className="flex flex-col items-start gap-2">
                  <span className="text-sm font-medium">หมวดหมู่บริการ</span>
                  <Select
                    value={serviceData.categoryServiceId}
                    onValueChange={(value) =>
                      setServiceData({
                        ...serviceData,
                        categoryServiceId: value,
                      })
                    }
                  >
                    <SelectTrigger className="w-full h-10 sm:h-[2.5rem]">
                      <SelectValue placeholder="หมวดหมู่" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>หมวดหมู่บริการ</SelectLabel>
                        {categoryService.map((item) => (
                          <SelectItem key={item.id} value={item.id.toString()}>
                            {item.title}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col items-start gap-2">
                  <span className="text-sm font-medium">ภาพพื้นหลัง</span>
                  <ImageUpload onChange={setBgImage} />
                </div>
                <button
                  type="submit"
                  className="bg-[#8F2F34] h-12 sm:h-[3rem] text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-[#C65359] justify-center cursor-pointer transition-colors font-medium"
                >
                  <span>บันทึก</span>
                </button>
              </form>
            </DialogContent>
          </Dialog>

          {/* Add Product Button */}
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <button
                className="flex items-center justify-center gap-2 cursor-pointer rounded-md bg-[#8F2F34] text-white px-4 py-2 h-10 sm:h-[2.5rem] hover:bg-[#C65359] transition-colors"
                onClick={() => resetProductForm()}
              >
                <span className="text-sm font-medium">เพิ่มสินค้า</span>
                <Plus size={16} />
              </button>
            </DialogTrigger>
            <DialogContent className="max-w-[95vw] sm:max-w-[600px] p-4 max-h-[90vh] overflow-y-auto">
              <h6 className="text-lg font-semibold mb-4">เพิ่มรายการสินค้า</h6>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col items-start gap-2">
                  <span className="text-sm font-medium">หมวดหมู่</span>
                  <Select onValueChange={handleCategoryChange}>
                    <SelectTrigger className="w-full h-10 sm:h-[2.5rem]">
                      <SelectValue placeholder="เลือกหมวดหมู่สินค้า" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {categories.map((item) => (
                          <SelectItem key={item.id} value={item.id}>
                            {item.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col items-start gap-2">
                  <span className="text-sm font-medium">ชื่อสินค้า</span>
                  <Input
                    name="name"
                    className="w-full h-10 sm:h-[2.5rem]"
                    placeholder="ชื่อสินค้า"
                    value={data.name}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="flex flex-col items-start gap-2">
                  <span className="text-sm font-medium">รายละเอียด</span>
                  <textarea
                    name="detail"
                    className="w-full min-h-[6rem] max-h-[8rem] border border-gray-300 rounded-md p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#8F2F34] focus:border-transparent"
                    placeholder="รายละเอียด"
                    value={data.detail}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="flex flex-col items-start gap-2">
                  <span className="text-sm font-medium">ภาพสินค้า</span>
                  <ImageUpload onChange={setImage} />
                </div>

                <button
                  type="submit"
                  className="bg-[#8F2F34] h-12 sm:h-[3rem] text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-[#C65359] justify-center cursor-pointer transition-colors font-medium"
                >
                  <span>บันทึก</span>
                </button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default HeaderTop;
