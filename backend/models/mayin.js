const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('mayin', {
    ID: {
      type: DataTypes.STRING(16),
      allowNull: false,
      primaryKey: true
    },
    Hang: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    Model: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    KhayGiay: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    LoaiMuc: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    ViTri: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    TinhTrang: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    InMau: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    CongSuat: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    TrongLuong: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Kieu: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    TocDoIn: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    KichThuoc: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    BoNho: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    AnhMayIn: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'mayin',
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
