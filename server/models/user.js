export default (sequelize, DataTypes) => {
  const UserModel = sequelize.define('User', {
    name: {
      type: DataTypes.STRING(128),
      field: 'user_name',
      allowNull: false,
      set(val) {
        this.setDataValue('userName', val.toLowerCase());
      },
      validate: {
        required(value) {
          if (!value) {
            throw new Error('Username is required');
          }
        },
        isUniq(value) {
          return UserModel.find({ where: { user_name: value } }).then((user) => {
            if (user) {
              throw new Error('This username is already in use');
            }
          });
        },
      },
    },
    password: {
      type: DataTypes.CHAR(64),
      validate: {
        checkPassword(value) {
          if (!value) {
            return;
          }

          const minPasswordLength = 4;

          if (value.length < minPasswordLength) {
            throw new Error(`Password should have minimum ${minPasswordLength} characters`);
          }
        },
      },
    },
    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at',
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: 'updated_at',
    },
  });

  UserModel.associate = (models) => {
    UserModel.hasMany(models.Message);
  };

  return UserModel;
};

