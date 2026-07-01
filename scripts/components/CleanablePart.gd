extends Area2D

var dirt_amount := 100
var cleaned := false

func clean(value: int) -> void:
	if cleaned:
		return
	
	dirt_amount -= value

	if dirt_amount <= 0:
		dirt_amount = 0
		cleaned = true
		print("Peça limpa!")