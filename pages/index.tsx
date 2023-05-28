
import { Inter } from 'next/font/google'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import {sanityClient, urlFor} from '../sanity'
import { Post } from '@/typings'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

interface Props {
       posts: [Post]
}

export default function Home({posts}: Props) {
  // console.log(posts, "post");
  return (
           <div className='max-w-7xl mx-auto ml-8 mr-8 lg:mr-[200px] lg:ml-[200px]'>
            <Header />

            <div className='flex justify-between items-center bg-yellow-400 border-y border-black py-10 lg-py-0'>
              <div className='px-10 space-y-5'>
                <h1 className='text-4xl md:text-6xl max-w-xl font-serif'>
                  <span className='underline decoration-4'>Medium</span>  is a place to write, read, and connect
                </h1>
                <h2>
                  It's easy and free to post your thinking on any topic and connect with millions of readers
                </h2>
              </div>
              <img src="https://accountabilitylab.org/wp-content/uploads/2020/03/Medium-logo.png" className='hidden md:inline-flex h-32 lg:h-80'/>
            </div>

            {/* Posts */}

               <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 p-2'>
                {posts.map((post) => (
                  <Link key={post._id} href={`post/${post.slug.current}`}>
                    <div className='border rounded-lg cursor-pointer overflow-hidden group'>
                      <img src={urlFor(post.mainImage).url()!}  className='h-60 w-full object-cover group-hover:scale-105 transition-transform duration-200 ease-in-out' alt="" />
                      <div className='flex justify-between p-5 bg-white'>
                        <div>
                          <p className='text-lg font-bold'>{post.title}</p>
                          <p className='text-xs'>{post.description} by {post.author.name}</p>
                        </div>
                        <div>
                          <img src={urlFor(post.author.image).url()!} alt="" className='h-12 w-12 rounded-full' />
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
               </div>


           </div>
          
  )
}

export const getServerSideProps = async () => {
  const query = `*[_type=="post"]{
    _id,
      title,
      author->{
        name,
        image
      },
    description,
    mainImage,
    slug
  }` ;
 const posts = await sanityClient.fetch(query);

 return {
  props : {
    posts
  }
 }
}