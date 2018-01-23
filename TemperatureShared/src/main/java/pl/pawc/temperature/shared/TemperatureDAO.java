package pl.pawc.temperature.shared;

import java.util.List;

public interface TemperatureDAO {
	
	public void insert(Temperature temperature);
	public List<Temperature> getLatest(int intervalMinutes);
	public void insert(double value);

}