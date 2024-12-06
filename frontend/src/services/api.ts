import axios, { AxiosInstance } from "axios";
import { EventDTO } from "@/constants/types";

export enum ContentType {
  Json = "application/json",
}

class Api {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: "http://localhost:8080/api",
      headers: {
        "Content-Type": ContentType.Json,
      },
    });

    this.instance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response) {
          return Promise.reject(error.response);
        }
        return Promise.reject(error);
      }
    );
  }

  private convertDates(event: EventDTO): EventDTO {
    // Verifica se o campo startDate é uma string e converte
    if (typeof event.startDate === "string") {
      event.startDate = new Date(event.startDate);
    }

    // Verifica se o campo endDate é uma string e converte
    if (typeof event.endDate === "string") {
      event.endDate = new Date(event.endDate);
    }

    return event;
  }

  /**
   * Recupera todos os eventos e converte as datas de string para Date
   */
  async getAllEvents(): Promise<EventDTO[]> {
    const response = await this.instance.get<EventDTO[]>("/event");
    return response.data.map(this.convertDates); // Converte todas as datas
  }

  /**
   * Recupera um evento pelo ID e converte as datas de string para Date
   * @param id ID do evento
   */
  async getEventById(id: number): Promise<EventDTO> {
    const response = await this.instance.get<EventDTO>(`/event/${id}`);
    return this.convertDates(response.data); // Converte as datas
  }

  /**
   * Cria um novo evento.
   * @param data Dados do evento
   */
  async createEvent(data: EventDTO): Promise<EventDTO> {
    const response = await this.instance.post<EventDTO>("/event", data);
    return response.data;
  }

  /**
   * Atualiza um evento existente.
   * @param id ID do evento
   * @param data Dados atualizados
   */
  async updateEvent(id: number, data: EventDTO): Promise<void> {
    await this.instance.put(`/event/${id}`, data);
  }

  /**
   * Deleta um evento pelo ID.
   * @param id ID do evento
   */
  async deleteEvent(id: number): Promise<void> {
    await this.instance.delete(`/event/${id}`);
  }
}

const api = new Api();
export default api;
