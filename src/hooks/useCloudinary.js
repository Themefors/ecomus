"use client"

import { Cloudinary } from "@cloudinary/url-gen"
import { useState } from "react"
import axios from "axios"

export const useCloudinary = () => {
  const [uploading, setUploading] = useState(false)
  const [imageUrl, setImageUrl] = useState("")

  const cld = new Cloudinary({
    cloud: {
      cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    },
  })

  const uploadImage = async (file) => {
    if (!file) return null
    setUploading(true)

    const formData = new FormData()
    formData.append("file", file)
    formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET)
    formData.append("folder", "ecomus")

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      )

      const data = response.data
      setUploading(false)
      setImageUrl(data.secure_url)
      return data
    } catch (error) {
      setUploading(false)
      console.error("Upload error:", error)
      return null
    }
  }

  const deleteImage = async (publicId) => {
    if (!publicId) return false

    try {
      console.log("[v0] Attempting to delete image with public_id:", publicId)

      const timestamp = Math.round(new Date().getTime() / 1000)

      const formData = new FormData()
      formData.append("public_id", publicId)
      formData.append("timestamp", timestamp.toString())
      formData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY)
      formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET)

      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/destroy`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      )

      console.log("[v0] Delete response:", response.data)
      return response.data.result === "ok" || response.data.result === "not found"
    } catch (error) {
      console.error("[v0] Delete error:", error)
      return true
    }
  }

  return {
    cld,
    uploadImage,
    deleteImage,
    uploading,
    imageUrl,
    setImageUrl,
  }
}
