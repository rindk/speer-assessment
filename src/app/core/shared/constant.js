export const callType = {
  missed: 'missed',
  answered: 'answered',
  voice: 'voicemail',
};

export const callDirection = {
  in: 'inbound',
  out: 'outbound',
};

export const callMsg = {
  [callType.voice]: 'send a voice mail',
  [callType.missed]: 'call on',
  [callType.answered]: 'call on',
};
