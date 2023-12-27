/*
 * Created by ArduinoGetStarted.com
 *
 * This example code is in the public domain
 *
 * Tutorial page: https://arduinogetstarted.com/tutorials/arduino-light-sensor
 * 
 */

const int SENSOR_PIN_1 = 2; 
const int SENSOR_PIN_2 = 3; 
const int SENSOR_PIN_3 = 4; 
const int SENSOR_PIN_4 = 5; 
const int SENSOR_PIN_5 = 6; 

void setup() {
  
  // initialize serial communication at 9600 bits per second:
  Serial.begin(9600);
  
  pinMode(SENSOR_PIN_1, INPUT); 
  pinMode(SENSOR_PIN_2, INPUT);
  pinMode(SENSOR_PIN_3, INPUT);
  pinMode(SENSOR_PIN_4, INPUT);
  pinMode(SENSOR_PIN_5, INPUT);
  
}



void measureDigitalLight(String sensorName, int lightState){
  
  if (lightState == HIGH) {
    Serial.println(sensorName);
    //Serial.print(" - ");
    //Serial.println("DARK");
  }
  else {
    //Serial.print(sensorName);
    //Serial.print(" - ");
    //Serial.println("LIGHT");
  }
  
  //Serial.println(lightState);
  
}

void loop() {
  
  //reads the input on analog pin A0 (value between 0 and 1023)
  //int sensor_1 = analogRead(A0);

  int reading_1 = digitalRead(SENSOR_PIN_1);
  int reading_2 = digitalRead(SENSOR_PIN_2);
  int reading_3 = digitalRead(SENSOR_PIN_3);
  int reading_4 = digitalRead(SENSOR_PIN_4);
  int reading_5 = digitalRead(SENSOR_PIN_5);
  
  measureDigitalLight("s1", reading_1);
  measureDigitalLight("s2", reading_2);
  measureDigitalLight("s3", reading_3);
  measureDigitalLight("s4", reading_4);
  //measureDigitalLight("s5", reading_5);
  
  //measureAnalogLight("s1", sensor_1); // working

  delay(200);
}


void measureAnalogLight(String sensorName, int sensorVal){
    if (sensorVal < 10) {
    Serial.print(sensorName);
    Serial.print(" - ");
    Serial.print(sensorVal);
    Serial.println(" - Dark");
  } else if (sensorVal < 200) {
    Serial.print(sensorName);
    Serial.print(" - ");
    Serial.print(sensorVal);
    Serial.println(" - Dim");
  } else if (sensorVal < 500) {
    Serial.print(sensorName);
    Serial.print(" - ");
    Serial.print(sensorVal);
    Serial.println(" - Light");
  } else if (sensorVal < 800) {
    Serial.print(sensorName);
    Serial.print(" - ");
    Serial.print(sensorVal);
    Serial.println(" - Bright");
  } else {
    Serial.print(sensorName);
    Serial.print(" - ");
    Serial.print(sensorVal);
    Serial.println(" - Very bright");
  }
}
