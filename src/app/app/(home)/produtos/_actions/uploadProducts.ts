'use server'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'

export const uploadImageProducts = async (form: FormData) => {
  const slug = form.get('slug')
  const file = form.get('image') as File

  console.log(slug, file)

  const buffer = (await file.arrayBuffer()) as Buffer

  const client = new S3Client()

  const command = new PutObjectCommand({
    Bucket: process.env.NEXT_PUBLIC_BUCKET_NAME,
    ACL: 'public-read',
    Key: `products/${slug}/${file.name}`,
    Body: buffer,
    ContentType: file.type,
  })

  await client.send(command)

  const newProducts = {
    image: `https://s3-cardapio-digital.s3.us-west-1.amazonaws.com/products/${slug}/${file.name}`,
  }

  return newProducts
}
