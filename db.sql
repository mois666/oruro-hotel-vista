Table users { --usuario
  id int
  name char
  last_name varchar
  role bool
  email varchar
  password varchar
}

Table rooms { --habitacion
  id int
  num_room int
  bed_quantity int
  type varchar
}

Table clients { --cliente
  id int
  name char
  last_name varchar
  ci int
}

Table reservations { --reserva 
  id int
  client_id int
  user_id int
  start_date datetime 
  end_date datetime 
  simple bool
  double bool 
  state  bool 
  discount int 
  total int
  foreign key (client_id) references clients(id)
  foreign key (user_id) references users(id)
  created_at datetime
  updated_at datetime
}

Table assignments { --asignacion
  id int
  room_id int
  reservation_id int
  key_room bool
  foreign key (room_id) references rooms(id)
  foreign key (reservation_id) references reservation(id)
  created_at datetime
  updated_at datetime
}