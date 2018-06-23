export default (sequelize, DataTypes) => {
  const MessageModel = sequelize.define('Message', {
    text: {
      type: DataTypes.STRING(128),
      allowNull: false,
      validate: {
        required(value) {
          if (!value) {
            throw new Error('Text is required');
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

  MessageModel.associate = (models) => {
    MessageModel.belongsTo(models.User);
  };

  return MessageModel;
};
