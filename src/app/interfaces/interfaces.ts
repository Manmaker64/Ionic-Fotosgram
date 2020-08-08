export interface RespuestaPosts {
  ok: boolean;
  pagina: number;
  posts: Post[];
}

export interface Post {
  imgs?: string[];
  _id?: string;
  mensaje?: string;
  coords?: string;
  usuario?: Usuario;
  created?: string;
}

export interface PostBasic {
  mensaje?: string;
  coords?: string;
  position?: boolean;
}

export interface PostNew {
  ok: boolean;
  post: Post;
}

export interface Usuario {
  avatar?: string;
  _id?: string;
  nombre?: string;
  email?: string;
  password?: string;
}

export interface Token {
  ok: boolean;
  token: string;
}

export interface Avatar {
  img: string;
  seleccionado: boolean;
}

export interface Login {
  email: string;
  password: string;
}

export interface UsuarioToken {
  ok: boolean;
  usuario: Usuario;
}
