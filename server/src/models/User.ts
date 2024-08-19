import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/connection';

class User extends Model {
  public user_id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public sessionToken!: string | null; 

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    user_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sessionToken: {
      type: DataTypes.STRING,
      allowNull: true, // Pode começar como `null`
    },
  },
  {
    sequelize,
    modelName: 'User',
  }
);

/*User.sync({ alter: true })
  .then(() => {
    console.log('Tabela "User" foi criada ou alterada com sucesso.');
  })
  .catch((error) => {
    console.error('Erro ao criar ou alterar a tabela "User":', error);
  });*/
  
export default User;
