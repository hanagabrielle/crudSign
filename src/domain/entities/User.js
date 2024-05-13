import { Schema, model } from "mongoose";

const userSchema = new Schema({
  nome: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  senha: {
    type: String,
    required: true,
  },
  telefones: [
    {
      numero: String,
      ddd: String,
    },
  ],
  data_criacao: {
    type: Date,
    default: Date.now,
  },
  data_atualizacao: {
    type: Date,
    default: Date.now,
  },
  ultimo_login: {
    type: Date,
    default: Date.now,
  },
  token: String,
});

const User = model("user", userSchema);

export default User;
