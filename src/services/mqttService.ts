import mqtt from 'mqtt';

const BROKER_URL = 'wss://broker.hivemq.com:8884/mqtt';

// PERSONALIZE AQUI! Use o mesmo tópico que você configurou no Wokwi
const TOPIC_TELEMETRIA = 'ufc/alimentador/raissa/telemetria';
const TOPIC_COMANDO = 'ufc/alimentador/raissa/comando';

export interface TelemetriaData {
  deviceId: string;
  foodLevel: number;
  temperature: number;
  humidity: number;
  status: 'ok' | 'warning' | 'error';
  timestamp: number;
}

class MQTTService {
  private client: mqtt.MqttClient | null = null;
  private callbacks: Map<string, Function> = new Map();
  private isConnected = false;

  connect() {
    if (this.client) {
      console.log('⚠️  Cliente MQTT já conectado');
      return;
    }

    console.log('🔌 Conectando ao broker MQTT...');
    
    this.client = mqtt.connect(BROKER_URL, {
      clean: true,
      connectTimeout: 4000,
      reconnectPeriod: 1000,
    });

    this.client.on('connect', () => {
      this.isConnected = true;
      console.log('✓ Conectado ao broker MQTT');
      
      // Inscrever no tópico de telemetria
      this.client?.subscribe(TOPIC_TELEMETRIA, { qos: 0 }, (err) => {
        if (!err) {
          console.log('✓ Inscrito em:', TOPIC_TELEMETRIA);
        } else {
          console.error('✗ Erro ao se inscrever:', err);
        }
      });
    });

    this.client.on('message', (topic, message) => {
      try {
        const data = JSON.parse(message.toString());
        console.log('📨 Mensagem recebida:', topic, data);
        
        const callback = this.callbacks.get(topic);
        if (callback) {
          callback(data);
        }
      } catch (error) {
        console.error('✗ Erro ao processar mensagem:', error);
      }
    });

    this.client.on('error', (error) => {
      console.error('✗ Erro MQTT:', error);
      this.isConnected = false;
    });

    this.client.on('offline', () => {
      console.log('⚠️  Cliente MQTT offline');
      this.isConnected = false;
    });

    this.client.on('reconnect', () => {
      console.log('🔄 Reconectando ao MQTT...');
    });
  }

  onMessage(topic: string, callback: (data: TelemetriaData) => void) {
    this.callbacks.set(topic, callback);
  }

  sendCommand(action: string, params?: any) {
    if (!this.isConnected) {
      console.warn('⚠️  Cliente MQTT não está conectado');
      return;
    }

    const command = { 
      action,
      timestamp: Date.now(),
      ...params 
    };
    
    this.client?.publish(TOPIC_COMANDO, JSON.stringify(command), { qos: 0 }, (err) => {
      if (!err) {
        console.log('📤 Comando enviado:', command);
      } else {
        console.error('✗ Erro ao enviar comando:', err);
      }
    });
  }

  disconnect() {
    if (this.client) {
      this.client.end();
      this.client = null;
      this.isConnected = false;
      console.log('🔌 Desconectado do MQTT');
    }
  }

  getConnectionStatus(): boolean {
    return this.isConnected;
  }
}

// Singleton
export const mqttService = new MQTTService();
export { TOPIC_TELEMETRIA, TOPIC_COMANDO };
