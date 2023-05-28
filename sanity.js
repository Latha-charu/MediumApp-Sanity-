import { createClient, createCurrentUserHook } from "next-sanity"
import createImageUrlBuilder from '@sanity/image-url'

export const config = {
    dataset : process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
    projectId : process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    //  you can find project id & dataset in sanity.cli.ts file
    apiVersion : "2021-10-21", // you can get this in sanity browser in vision tab
    useCdn : process.env.NODE_ENV === "production"
}


export const sanityClient = createClient(config);
export const urlFor = (source) => createImageUrlBuilder(config).image(source);
// Set up a helper function for generating Image URLs with only the asset reference data in your documents to get data of the image
// export const useCurrentUser = createCurrentUserHook(config);
//Helper function for using the current logged in user account