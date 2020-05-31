import { Router } from "express";
import { ImageFilterRouter } from "./v0/imagefilter/routes/imagefilter.router";

const router = Router()

router.use('/filteredimage', ImageFilterRouter)

export const IndexRouter: Router = router