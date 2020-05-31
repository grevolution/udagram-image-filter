import { Router, Request, Response } from "express";
import { validateUrl } from "../../../../../src/util/util";
import { filterImageFromURL } from "../../../../../src/util/util";
import { deleteLocalFiles } from "../../../../../src/util/util";

const router: Router = Router();

  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  // GET /filteredimage?image_url={{URL}}
  // endpoint to filter an image from a public url.
  // IT SHOULD
  //    1
  //    1. validate the image_url query
  //    2. call filterImageFromURL(image_url) to filter the image
  //    3. send the resulting file in the response
  //    4. deletes any files on the server on finish of the response
  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

  /**************************************************************************** */
  //! END @TODO1

router.get('/', async(req: Request, res: Response) => {
    const imageUrl: string = req.query.image_url

    if( !imageUrl ){
        res.status(400).send({error: "Image URL is required"})
    }

    if( !validateUrl(imageUrl) ){
        res.status(400).send({error: "Image URL is malformed"})
    }

    let filteredImage = await filterImageFromURL(imageUrl)
    if(filteredImage){
        res.status(200).sendFile(filteredImage, (error) => {
            //delete the local files
            deleteLocalFiles([filteredImage])            
        });
    } else {
        res.status(422).send({error: "Provided URL cannot be processed"});
    }
});

export const ImageFilterRouter: Router = router