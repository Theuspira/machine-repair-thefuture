extends Area2D

@export var accepted_size: String = "small"

var inserted_gear = null

func can_insert(gear) -> bool:
	return gear.gear_size == accepted_size

func insert_gear(gear) -> void:
	if can_insert(gear):
		inserted_gear = gear
		print("Engrenagem encaixada.")
	else:
		print("Engrenagem incorreta.")