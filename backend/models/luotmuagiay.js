const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('luotmuagiay', {
    ID: {
      type: DataTypes.STRING(16),
      allowNull: false,
      primaryKey: true
    },
    ThoiGian: {
      type: DataTypes.DATE,
      allowNull: false
    },
    Loai: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    SoLuong: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    ID_NguoiDung: {
      type: DataTypes.STRING(16),
      allowNull: false,
      references: {
        model: 'nguoidung',
        key: 'ID'
      }
    },
    PhuongThucThanhToan: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'luotmuagiay',
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
      {
        name: "ID_NguoiDung",
        using: "BTREE",
        fields: [
          { name: "ID_NguoiDung" },
        ]
      },
    ]
  });
};
