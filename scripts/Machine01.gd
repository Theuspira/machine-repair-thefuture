extends Node2D

var clean_task_done := false
var gear_01_done := false
var gear_02_done := false
var red_wire_done := false
var blue_wire_done := false

func set_clean_done(value: bool) -> void:
	clean_task_done = value
	check_status()

func set_gear_done(slot_id: String, value: bool) -> void:
	if slot_id == "gear_01":
		gear_01_done = value
	elif slot_id == "gear_02":
		gear_02_done = value
	
	check_status()

func set_wire_done(wire_id: String, value: bool) -> void:
	if wire_id == "red":
		red_wire_done = value
	elif wire_id == "blue":
		blue_wire_done = value
	
	check_status()

func is_machine_ready() -> bool:
	return clean_task_done \
		and gear_01_done \
		and gear_02_done \
		and red_wire_done \
		and blue_wire_done

func check_status() -> void:
	print("Status da máquina:")
	print("Limpeza: ", clean_task_done)
	print("Engrenagem 01: ", gear_01_done)
	print("Engrenagem 02: ", gear_02_done)
	print("Fio vermelho: ", red_wire_done)
	print("Fio azul: ", blue_wire_done)

func power_on() -> void:
	if is_machine_ready():
		print("MACHINE ONLINE")
	else:
		print("Ainda tem coisa errada")