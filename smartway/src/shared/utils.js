import Sound from 'react-native-sound';

export function isEmpty(obj) {
  for(var key in obj) {
      if(obj.hasOwnProperty(key))
          return false;
  }
  return true;
}

export function getHeaders() {
  return {
    headers: {
      'content-type': 'application/json'
    }
  };
}

export function feedback(sound) {
  let feedback = new Sound(sound, null, error => {
    if (error) console.log("Occoreu um problema na leitura do audio:", error)

    feedback.play(success => {
      if (!success) console.log("A reprodução falhou devido a erros de decodificação do áudio.")
    });
  });

  feedback.setVolume(1);
  feedback.release();
}