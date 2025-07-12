'use client'

import Link from "next/link"

export default function ErrorPage() {
  return(
    <div>
    <p>sorry something went wrong</p>
  <Link href='/'>
  click here to go to the main page
  </Link>
    </div>
  )
}