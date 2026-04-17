/**
 * @swagger
 * tags:
 *   name: Apartment
 *   description: Apartment Management APIs
 */

/**
 * @swagger
 * /apartments:
 *   get:
 *     summary: Get apartments with filters and pagination
 *     tags: [Apartment]
 *     parameters:
 *       - in: query
 *         name: city
 *         example: Chennai
 *       - in: query
 *         name: area
 *         example: Velachery
 *       - in: query
 *         name: minPrice
 *         example: 10000
 *       - in: query
 *         name: maxPrice
 *         example: 50000
 *       - in: query
 *         name: page
 *         example: 1
 *       - in: query
 *         name: limit
 *         example: 10
 *     responses:
 *       200:
 *         description: Apartments fetched successfully
 */

/**
 * @swagger
 * /apartments/register:
 *   post:
 *     summary: Create apartment (Admin only)
 *     tags: [Apartment]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           example:
 *             title: Luxury Apartment
 *             description: Fully furnished
 *             price: 25000
 *             city: Chennai
 *             area: OMR
 *             noOfFlats: 20
 *             ownerName: Kumar
 *             contactNumber: 9876543210
 *             email: owner@gmail.com
 *     responses:
 *       201:
 *         description: Apartment created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (Admin only)
 */

/**
 * @swagger
 * /apartments/{id}:
 *   put:
 *     summary: Update apartment
 *     tags: [Apartment]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         example: 1
 *     requestBody:
 *       content:
 *         application/json:
 *           example:
 *             title: Updated Apartment
 *             price: 30000
 *             city: Bangalore
 *     responses:
 *       200:
 *         description: Apartment updated successfully
 *       400:
 *         description: Invalid apartment ID
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /apartments/remove/{id}:
 *   delete:
 *     summary: Delete apartment
 *     tags: [Apartment]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         example: 1
 *     responses:
 *       200:
 *         description: Apartment deleted successfully
 *       400:
 *         description: Invalid apartment ID
 *       401:
 *         description: Unauthorized
 */