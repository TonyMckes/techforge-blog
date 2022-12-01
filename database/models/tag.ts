import {
  DataTypes,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import type { Article, AssociatesTypes, ConnectionInstance } from ".";

export class Tag extends Model<
  InferAttributes<Tag>,
  InferCreationAttributes<Tag>
> {
  declare name: string;

  declare articleId: ForeignKey<Article["id"]>;

  static associate({ Article }: AssociatesTypes) {
      this.belongsToMany(Article, {
      as: { plural: "articles", singular: "article" },
        foreignKey: "tagName",
      through: "TagList",
        timestamps: false,
      });
    }

  toJSON(): NonAttribute<string> {
    return this.name;
    }
  }

const tagModel = (sequelize: ConnectionInstance) => {
  Tag.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
    },
    {
      sequelize,
      modelName: "Tag",
      timestamps: false,
    }
  );

  return Tag;
};

export default tagModel;
