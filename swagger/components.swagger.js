/**
 * @swagger
 * components:
 *   schemas:
 *      Colors :
 *          type : array
 *          items:
 *              type : string
 *              enum :
 *                  - black
 *                  - white
 *                  - gray
 *                  - red
 *                  - blue
 *                  - green
 *                  - orange
 *                  - purple
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Course:
 *             type: object
 *             required:
 *               - title
 *               - short_text
 *               - text
 *               - tags
 *               - category
 *               - price
 *               - discount
 *               - image
 *               - type
 *             properties:
 *               title:
 *                 type: string
 *                 description: the title of the product
 *                 example : عنوان دوره
 *               short_text:
 *                 type: string
 *                 description: the short description of the product
 *                 example : مثال کوتاه شده دوره
 *               text:
 *                 type: string
 *                 description: the full description of the product
 *                 example : مثال کوتاه شده دوره
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: the tags assigned to the product
 *               category:
 *                 type: string
 *                 description: the category of the product
 *               price:
 *                 type: string
 *                 description: the price of the product
 *               discount:
 *                 type: string
 *                 description: the discount on the product
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: the image count of the product
 *               type:
 *                   $ref: '#/components/schemas/Types'
 *     Edit-Course:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: the title of the product
 *                 example : عنوان دوره
 *               short_text:
 *                 type: string
 *                 description: the short description of the product
 *                 example : مثال کوتاه شده دوره
 *               text:
 *                 type: string
 *                 description: the full description of the product
 *                 example : مثال کوتاه شده دوره
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: the tags assigned to the product
 *               category:
 *                 type: string
 *                 description: the category of the product
 *               price:
 *                 type: string
 *                 description: the price of the product
 *               discount:
 *                 type: string
 *                 description: the discount on the product
 *               images:
 *                 type: string
 *                 format: binary
 *                 description: the image count of the product
 *               type:
 *                   $ref: '#/components/schemas/Types'
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     BlogCategory:
 *       type: object
 *       required:
 *         - title
 *         - text
 *         - short_text
 *         - tags
 *         - category
 *         - image
 *       properties:
 *         title:
 *           type: string
 *           description: "The title of the blog category"
 *         text:
 *           type: string
 *           description: "The detailed text of the blog category"
 *         short_text:
 *           type: string
 *           description: "A short description of the blog category"
 *         tags:
 *           type: string
 *           description: "Associated tags for the category, separated by #"
 *           example: "tag1#tag2#tag3"
 *         category:
 *           type: string
 *           description: "The ID of the parent category"
 *         image:
 *           type: string
 *           format: binary
 *           description: "Image file for the blog category"
 *       example:
 *         title: "A Guide to Modern Web Development"
 *         text: "Detailed article content here"
 *         short_text: "An overview of modern web development practices"
 *         tags: "webdev#coding#javascript"
 *         category: "5f2b39035a83a33d2f3dfcc5"
 *         image: (binary)
 */
/**
 * @swagger
 * components:
 *   schemas:
 *      Types :
 *          type : array
 *          items:
 *              type : string
 *              enum :
 *                  - free
 *                  - cash
 *                  - spechail
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *             type: object
 *             required:
 *               - title
 *               - short_text
 *               - text
 *               - tags
 *               - category
 *               - price
 *               - discount
 *               - count
 *             properties:
 *               title:
 *                 type: string
 *                 description: the title of the product
 *               short_text:
 *                 type: string
 *                 description: the short description of the product
 *               text:
 *                 type: string
 *                 description: the full description of the product
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: the tags assigned to the product
 *               category:
 *                 type: string
 *                 description: the category of the product
 *               price:
 *                 type: string
 *                 description: the price of the product
 *               discount:
 *                 type: string
 *                 description: the discount on the product
 *               count:
 *                 type: string
 *                 description: the available count of the product
 *               images:
 *                 type: array
 *                 items:
 *                      type: string
 *                      format: binary
 *                 description: the image count of the product
 *               wight:
 *                 type: string
 *                 description:  the wight file of the product packet
 *               height:
 *                 type: string
 *                 description:  the height file of the product packet
 *               width:
 *                 type: string
 *                 description:  the width file of the product packet
 *               length:
 *                 type: string
 *                 description:  the length file of the product packet
 *               colors:
 *                   $ref: '#/components/schemas/Colors'
 *               type:
 *                 type: string
 *                 enum: [virtual, physical]
 *                 description: the type of the product, either a virtual or physical item
 *     Edit-Product:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: the title of the product
 *               short_text:
 *                 type: string
 *                 description: the short description of the product
 *               text:
 *                 type: string
 *                 description: the full description of the product
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: the tags assigned to the product
 *               category:
 *                 type: string
 *                 description: the category of the product
 *               price:
 *                 type: string
 *                 description: the price of the product
 *               discount:
 *                 type: string
 *                 description: the discount on the product
 *               count:
 *                 type: string
 *                 description: the available count of the product
 *               images:
 *                 type: array
 *                 items:
 *                      type: string
 *                      format: binary
 *                 description: the image count of the product
 *               wight:
 *                 type: string
 *                 description:  the wight file of the product packet
 *               height:
 *                 type: string
 *                 description:  the height file of the product packet
 *               width:
 *                 type: string
 *                 description:  the width file of the product packet
 *               length:
 *                 type: string
 *                 description:  the length file of the product packet
 *               colors:
 *                   $ref: '#/components/schemas/Colors'
 *               type:
 *                 type: string
 *                 enum: [virtual, physical]
 *                 description: the type of the product, either a virtual or physical item
 */
