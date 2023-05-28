import { Header } from "@/components/Header";
import { sanityClient, urlFor } from "@/sanity";
import { Post } from "@/typings";
import { GetStaticProps } from "next";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import PortableText from "react-portable-text";

interface Props {
  post: Post;
}

interface IformInput {
  _id: string;
  name: string;
  email: string;
  comment: string;
}



const Post = ({ post }: Props) => {
  console.log("post current", post);
  
  const [abc, setAbc] = useState<Post|null>();
  const {register, handleSubmit, formState: {errors}} = useForm<IformInput>();

  useEffect(() => setAbc(post), []);

  const onSubmit:SubmitHandler<IformInput> = async(data) => {
    // console.log("form data", data);
    await fetch("api/createComment", {
      method: "POST",
      body: JSON.stringify(data),
    })
    .then(() => {
        console.log(data);
    })
    .catch((err) => {
      console.log(err);
    })
  }
  return (
    <div>
      <Header/>
            {abc?.mainImage && <img
        src={urlFor(abc?.mainImage).url()}
        alt=""
        className="w-full h-40 object-cover"
      />} 
          <div className="max-w-3xl mx-auto p-5">
          <h1 className="text-3xl mt-10 mb-3">{abc?.title}</h1>{" "}
        <h2 className="text-xl font-light text-gray-500 mb-2">
          {abc?.description}
        </h2>
     <div className="flex items-center space-x-2">
      {abc?.author.image &&  <img
            src={urlFor(abc?.author.image).url()!}
            className="h-10 w-10 rounded-full"
            alt=""
          />}
         
          <div
            className="font-extralight text-xs
        "
          >
            {" "}
            <span className="text-green-600">{abc?.author.name}</span> Published
            at { abc?._createdAt && new Date(abc?._createdAt).toLocaleString()}
          </div>
        </div>
        <div className="mt-10">
            <PortableText 
            dataset= {process.env.NEXT_PUBLIC_SANITY_DATASET}
            projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
            content = {post.body}
            serializers={{
                          h1: (props: any) => <h1  {...props} />,
                          li: ({ children } : any) => <li className="special-list-item">{children}</li>,
                        }}
            />
          </div>
     
          </div>
       
      
    </div>
  );
};

export default Post;

export const getStaticPaths = async () => {
  const query = `*[type=="post"] {
    _id,
    slug{
      current
    }
  }`;

  const posts = await sanityClient.fetch(query);

  const paths = posts.map((post: Post) => ({
    params: {
      slug: post.slug.current,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `*[_type=="post" && slug.current == $slug][0]{
              _id,
                _createdAt,
                title,
                author->{
                  name,
                  image
                },
               description,
                mainImage,
                slug,
                body
            }`;

  const post = await sanityClient.fetch(query, {
    slug: params?.slug,
  });

  if (!post) {
    return {
      notFound: true, //it will return 404 page if page not found
    };
  }
  return {
    props: {
      post,
    },
    revalidate: 60, // after the every 60 seconds page get refresh
  };
};

// import { Header } from '@/components/Header';
// import { sanityClient, urlFor } from '@/sanity';
// import { Post } from '../../typings';
// import { GetStaticProps } from 'next';
// import React from 'react'
// import PortableText from 'react-portable-text';

// interface Props {
//   post: Post
// }

//  export default function Posts({post}: Props){
//   console.log("paths", post);

//   return (
//     <main>
//        <Header />
//        <img src={urlFor(post.mainImage).url()} alt="" className='w-full h-40 object-cover' />

//        <article className='max-w-3xl mx-auto p-5'>
//          <h1 className='text-3xl mt-10 mb-3'>{post.title}</h1>
//          <h2 className='text-xl font-light text-gray-500 mb-2'>
//           {post.description}
//          </h2>

//          <div className='flex items-center space-x-2'>
//           <img src={urlFor(post.author.image).url()!}
//           className='h-10 w-10 rounded-full' alt="" />
//           <p className='font-extralight text-xs
//           '> <span className='text-green-600'>{post.author.name}</span> Published at {new Date(post._createdAt).toLocaleString()}</p>
//          </div>

//          <div>
//           <PortableText
//           className=''
//           dataset={process.env.NEXT_PUBLIC_SANITY_DATASET!}
//           projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!}
//           content={post.body}
//           serializers={{
//             h1: (props: any) => <h1  {...props} />,
//             li: ({ children } : any) => <li className="special-list-item">{children}</li>,
//           }}
//           />
//          </div>
//        </article>
//     </main>
//   )
// }

// // /
// export const getStaticPaths = async () => {
//   const query = `*[type == "post"] {
//     _id,
//     slug{
//       current
//     }
//   }`;

//   const posts = await sanityClient.fetch(query);

//   const paths = posts.map((post:Post) => ({
//     params: {
//       slug: post.slug.current
//     }
//   }))

//   return {
//     paths,
//     fallback: 'blocking'
//   };
// }

// export const getStaticProps : GetStaticProps = async ({params}) => {
//         const query = `*[_type=="post" && slug.current == $slug][0]{
//           _id,
//             _createdAt,
//             title,
//             author->{
//               name,
//               image
//             },
//            description,
//             mainImage,
//             slug,
//             body
//         }`;

//       const post = await sanityClient.fetch(query, {
//         slug: params?.slug,
//       });

//       if(!post) {
//         return {
//           notFound: true
//         };
//       }

//       return {
//         props : {
//           post,
//         },
//         revalidate: 60 // after the every 60 seconds page get refresh
//       }
// }
