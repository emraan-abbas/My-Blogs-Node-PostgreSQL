const Model = require('../models/index');


// Create Blogs
exports.createBlogs = async (req, res) => {
  try {
    // Validate Body
    if (!req.body) {
      return res.status(400).json({
        message: 'Enter required fileds.'
      });
    };

    // If Validation is TRUE
    const { blogs } = Model
    let blogsSaved = await blogs.create({
      title: req.body.title,
      description: req.body.description,
    });
    return res.status(201).json({
      message: 'Blog Created Successfully', blogsSaved
    });

  }
  catch (error) {
    console.log('=======', error)
    return res.status(401).json({
      message: 'Error at Create Blog !', error
    });
  }
};

// Get Blogs
exports.getBlogs = async (req, res) => {
  try {
    const allBlogs = await Model.blogs.findAll();
    if (allBlogs) {
      return res.status(200).json({
        message: 'Here is the list of all blogs.',
        allBlogs
      })
    }
    else {
      return res.status(400).json({
        message: 'No Blog Found.'
      })
    }

  }
  catch (error) {
    return res.status(401).json({
      message: 'Error at Get All Blogs !',
      error: error,
    });
  }
};

// Edit Blogs
exports.editBlogs = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({
        message: 'Fill the required fileds.'
      })
    }
    else {
      const update = await Model.blogs.update(
        {
          title: req.body.title,
          description: req.body.description
        },
        {
          where: {
            id: req.params.id
          }
        }
      );
      if (update) {
        return res.status(200).json({
          message: 'Data Updated Successfully !'
        })
      }
      else {
        return res.status(400).json({
          message: 'Blog Not Found !'
        })
      }
    }
  }
  catch (error) {
    return res.status(401).json({
      message: 'Error at Edit Blog !',
      error: error,
    });
  }
};

// Delete Blogs
exports.deleteBlogs = async (req, res) => {
  try {
    if (await Model.blogs.destroy({
      where: {
        id: req.params.id
      }
    })) {
      return res.status(200).json({
        message: 'Blog Deleted Successfully !'
      })
    }
    else {
      return res.status(200).json({
        message: 'Blog Not Found !'
      })
    }
  }
  catch (error) {
    return res.status(401).json({
      message: 'Error at Delete User !',
      error: error,
    });
  }
};
