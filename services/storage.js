'use strict';

const R = require('ramda');

module.exports.NAME = 'storageService';
module.exports.build = function (container) {
  const {repos: {pgTracksRepo, elasticTracksRepo}} = container,
    extractAudioCharacteristics = R.pipe(
      R.path(['composite_tracks']),
      R.reduce(
        function(accum, meta) {
          const {description, tags} = meta;

          return {
            audio_super_caption: accum.audio_super_caption + ' ' + description,
            audio_tags: R.concat(accum.audio_tags, tags)
          };
        },
        {audio_super_caption: '', audio_tags: []}
      ),
      R.evolve({
        audio_tags: R.uniq
      })
    );

  function extractCharacteristics(track) {
    const {id, name, media_id, metadata} = track,
      audioCharacteristics = extractAudioCharacteristics(metadata)

    return {
      id,
      name,
      media_id,
      audio_super_caption: audioCharacteristics.audio_super_caption,
      audio_tags:  audioCharacteristics.audio_tags
    };
  }

  return {
    storeSingle: async function (id) {
      const track = await pgTracksRepo.getTrackById(id),
        document = extractCharacteristics(track);

      try {
        const result = await elasticTracksRepo.indexTrack(document);

        return result;
      } catch(err) {
        console.error(err);

        return err;
      }
    }
  }
};
