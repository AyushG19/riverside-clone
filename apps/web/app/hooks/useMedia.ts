import { RefObject, useRef, useState } from "react";
import { IDBPDatabase, openDB } from "idb";

export default function useMedia() {
  const recorderRef = useRef<MediaRecorder | null>(null);
  const dbRef = useRef<IDBPDatabase<unknown> | null>(null);
  const chunkIndexRef = useRef<number>(0);
  const recordingIdRef = useRef<string | null>(null);

  const createDb = async () => {
    const db = await openDB("oceanside", 3, {
      upgrade(db) {
        if (!db.objectStoreNames.contains("recordings")) {
          db.createObjectStore("recordings", { keyPath: "id" });
        }

        if (!db.objectStoreNames.contains("recording-chunks")) {
          const store = db.createObjectStore("recording-chunks", {
            keyPath: "id",
          });
          store.createIndex("recordingId", "recordingId");
        }
      },
    });
    dbRef.current = db;
    return db;
  };

  const startNewRecording = async (interval: number = 5000) => {
    if (!dbRef.current || !recorderRef.current) {
      return;
    }

    const newRecId = crypto.randomUUID();
    recordingIdRef.current = newRecId;
    await dbRef.current.put("recordings", {
      id: newRecId,
      createdAt: Date.now(),
    });
    recorderRef.current.start(interval);
  };

  const stopRecording = () => {
    if (!recorderRef.current) {
      console.error("No recorder instance");
      return;
    }
    recorderRef.current.stop();
  };
  const streamScreen = async () => {
    const screenMedia = await navigator.mediaDevices.getDisplayMedia({
      video: true,
      audio: true,
    });
    return screenMedia;
  };
  const streamCamera = async (cam: boolean, mic: boolean) => {
    const camera = await navigator.mediaDevices.getUserMedia({
      video: cam,
      audio: mic,
    });
    return camera;
  };

  const initRecorder = async (stream: MediaStream) => {
    await createDb();
    console.log("dbref", dbRef);
    if (!dbRef.current) {
      console.log("NO dbref");
      return;
    }

    const mimeType = MediaRecorder.isTypeSupported("video/webm;codecs=vp9,opus")
      ? "video/webm;codecs=vp9,opus"
      : "video/webm";
    recorderRef.current = new MediaRecorder(stream, { mimeType });
    recorderRef.current.ondataavailable = async (event) => {
      console.log("data avaialble");
      if (dbRef.current) {
        console.log("setting chunks in db");
        const chunkId = chunkIndexRef.current++;
        const recId = recordingIdRef.current;
        if (!recId) console.error("start recofing again");
        await dbRef.current.put("recording-chunks", {
          id: `${recId}-${chunkId}`,
          recordingId: recId,
          blob: event.data,
          createdAt: Date.now(),
        });
      }
    };
    recorderRef.current.onstop = async () => {
      if (!dbRef.current) return;
      const chunks: Blob[] = await dbRef.current.getAll("recording-chunks");
      const blob = new Blob(chunks, { type: recorderRef.current?.mimeType });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "recording.webm";
      a.click();

      URL.revokeObjectURL(url);
    };
    return recorderRef;
  };
  return {
    streamScreen,
    streamCamera,
    initRecorder,
    recorderRef,
    stopRecording,
    startNewRecording,
  };
}
