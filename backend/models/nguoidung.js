const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('nguoidung', {
    ID: {
      type: DataTypes.STRING(16),
      allowNull: false,
      primaryKey: true
    },
    Ten: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    TenDangNhap: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    MatKhau: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    SoLuongGiay: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    VaiTro: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    RefreshToken: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'nguoidung',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ID" },
        ]
      },
    ]
  });
};
