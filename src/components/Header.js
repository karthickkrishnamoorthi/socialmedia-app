"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import Modal from "react-modal";
import { IoMdAddCircleOutline } from "react-icons/io";
import { HiCamera } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import { getApp } from "firebase/app";
import { app } from "../../firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { addDoc, collection, getFirestore, serverTimestamp } from "firebase/firestore";

const Header = () => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [story, setStory] = useState(null);
  const [addImage, setAddImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [imageUploading, setImageUploading] = useState(false);
  const [uploadFullPost, setUploadFullPost] = useState(false);
  const imageSelectRef = useRef();
  const db = getFirestore(app);

  console.log("1111", session, addImage, imageUrl);

  const handleStory = (e) => {
    let data = e.target.value;
    setStory(data);
  };
  const handleAddImage = (e) => {
    let file = e.target.files[0];
    if (file) {
      setAddImage(file);
      setImageUrl(URL.createObjectURL(file));
      // console.log(file);
    }
  };
  useEffect(() => {
    if (addImage) {
      uploadImageToStorage();
    }
  }, [addImage]);

  async function uploadImageToStorage() {
    setImageUploading(true);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + "-" + addImage?.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, addImage);
    uploadTask.on(
      "state_changed",
      // check upload task progess value //
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("upload progress", progress, "done");
      },
      (error) => {
        console.log(error), setImageUploading(false);
        setAddImage(null);
        setImageUrl(null);
      },
      // download url//
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setImageUrl(downloadUrl);
          setImageUploading(false);
        });
      }
    );
  }

  async function handleSubmit() {
    setUploadFullPost(true);
    const docRef = await addDoc(collection(db, "posts"), {
      username : session?.user?.username,
      story,
      profile : session?.user?.image,
      image : imageUrl,
      timestamp : serverTimestamp(),
    });
    setUploadFullPost(false)
    setIsOpen(false)
  }

  return (
    <div className="shadow-sm border-b sticky top-0 bg-white z-30 p-3">
      <div className="flex gap-3 justify-between items-center max-w-6xl mx-auto">
        {/* logo */}
        <Link href="/" className="hidden lg:inline-flex">
          <Image
            src="/Instagram_logo_black.webp"
            width={96}
            height={96}
            alt="instagram logo"
          />
        </Link>

        <Link href="/" className="lg:hidden">
          <Image
            src="/800px-Instagram_logo_2016.webp"
            width={40}
            height={40}
            alt="instagram logo"
          />
        </Link>

        <input
          type="text"
          placeholder="search here.."
          className=" bg-gray-50 border border-gray-200 rounded text-sm w-full py-2 px-4 max-w-180px]:"
        />

        {session ? (
          <div className=" flex gap-2 pl-2 items-center">
            <IoMdAddCircleOutline
              onClick={() => setIsOpen(true)}
              className="text-5xl cursor-pointer transform hover:scale-125 transition duration-300 hover:text-red-400"
            />

            <img
              className="h-10 w-10 rounded-full cursor-pointer"
              src={session?.user?.image}
              alt={session?.user?.name}
              height={24}
              width={24}
              onClick={signOut}
            />
            {/* <span className="width-80 pl-2">{session?.user?.name}</span> */}
          </div>
        ) : (
          <button
            onClick={signIn}
            className="text-sm font-semibold text-blue-500 w-90px"
          >
            Log in
          </button>
        )}
      </div>
      {isOpen && (
        <Modal
          isOpen={isOpen}
          className="max-w-lg w-[90%] p-6 absolute top-56 left-[20%] translate-x-[50%] bg-white border-2 rounded-md shadow-md"
          onRequestClose={() => setIsOpen(false)}
          ariaHideApp={false}
        >
          <div className="flex flex-col justify-center items-center h-[100%]">
            {addImage ? (
              <img
                src={imageUrl}
                alt="selected file"
                className={`${
                  imageUploading ? "animate-pulse" : ""
                } w-full max-h-[215px] object-cover cursor-pointer`}
                onClick={() => setAddImage(null)}
              />
            ) : (
              <HiCamera
                onClick={() => imageSelectRef.current.click()}
                className="text-5xl text-grey-400 cursor-pointer"
              />
            )}
            <input
              hidden
              ref={imageSelectRef}
              type="file"
              placeholder="choose an image"
              accept="image/*"
              onChange={handleAddImage}
            />
          </div>
          <input
            type="text"
            max="150"
            placeholder="tell about story...."
            className="m-4 border-none text-left w-full focus:ring-0 outline-none"
            // onClick={}
            onChange={handleStory}
          />
          <button
            onClick={handleSubmit}
            disabled= {!addImage || !story === '' || uploadFullPost || imageUploading ? true : false }
            className="w-full bg-red-600 text-white p-2 rounder-lg shadow-md hover:brightness-105 disabled:bg-gray-200 disabled:cursor-not-allowed disabled:hover:brightness-100"
          >
            upload Pic & post
          </button>
          <AiOutlineClose
            onClick={() => setIsOpen(false)}
            className="cursor-pointer absolute top-2 right-2 hover:text-red-600 transition duration-300"
          />
        </Modal>
      )}
    </div>
  );
};

export default Header;
