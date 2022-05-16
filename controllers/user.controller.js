const Model = require('../models/index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


// Create User
exports.createUser = async (req, res) => {
  try {
    // Validate Body
    if (!req.body) {
      return res.status(400).json({
        message: 'Enter required fileds.'
      });
    };

    // If Validation is TRUE
    const exist = await Model.users.findAll({
      where: {
        email: req.body.email
      }
    });

    if (exist.length) {
      return res.status(400).json({
        message: 'User with this email already exist !'
      });
    }
    else {
      bcrypt.hash(req.body.password, 8, async (err, hash) => {
        try {
          if (err) {
            console.log('========================', err)
            res.status(400).json({
              message: 'Error at BCRYPT !',
              err: err
            })
          }
          else {
            const { users } = Model
            let userSaved = await users.create({
              name: req.body.name,
              email: req.body.email,
              password: hash,
              role: req.body.role,
              status: req.body.status
            });
            return res.status(201).json({
              message: 'User Created Successfully', userSaved
            });
          }
        }
        catch (error) {
          console.log('-======', error)
          return res.status(401).json({
            message: 'Error at User Creation (Inner Function) !',
            error: error,
          });
        }
      })
    }

  }
  catch (error) {
    console.log('=======', error)
    return res.status(401).json({
      message: 'Error at Create User !', error
    });
  }
};

// User Login
exports.logIn = async (req, res) => {
  try {
    // Validate Body
    if (!req.body) {
      res.status(400).json({
        message: 'Enter required fields.'
      });
    }

    // If Validation is True
    const user = await Model.users.findOne({ where: { email: req.body.email } })
    if (user) {
      bcrypt.compare(req.body.password, user.password, async (err, result) => {
        try {
          if (err) {
            console.log('===========', err)
            res.status(400).json({
              message: 'Error at Bcrypt Compare',
              err: err
            })
          }
          else {
            const token = await jwt.sign(
              { email: result.email }, 'mySecretKey', { expiresIn: '1h' }
            );
            return res.status(200).json({
              message: 'Login Successful !',
              token: token
            })
          }
        }
        catch (error) {
          res.status(401).json({
            message: 'Error at Sign In (Inner Function) !',
            error: error
          });
        }
      });
    }
    else {
      res.status(400).json({
        message: 'User with this email does not exist. Sign Up first.'
      });
    }


  }
  catch (error) {
    return res.status(401).json({
      message: 'Error at Login !',
      error: error,
    });
  }
};

// Edit User
exports.editUser = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({
        message: 'Fill the required fileds.'
      })
    }
    else {
      const update = await Model.users.update(
        {
          name: req.body.name,
          role: req.body.role,
          status: req.body.status
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
          message: 'User Not Found !'
        })
      }
    }
  }
  catch (error) {
    return res.status(401).json({
      message: 'Error at Edit User !',
      error: error,
    });
  }
};

// Delete User
exports.deleteUser = async (req, res) => {
  try {
    if (await Model.users.destroy({
      where: {
        id: req.params.id
      }
    })) {
      return res.status(200).json({
        message: 'User Deleted Successfully !'
      })
    }
    else {
      return res.status(200).json({
        message: 'User Not Found !'
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

