class CreateTextToSpeechRequests < ActiveRecord::Migration[7.1]
  def change
    create_table :text_to_speech_requests do |t|
      t.text :text, null: false
      t.integer :status, null: false, default: 0

      t.timestamps
    end
  end
end
