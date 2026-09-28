import React, { useState } from 'react';
import { ArrowLeft, Save, X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { useStore, Animal } from '../store/useStore';

export default function ScreenCadastroRebanho() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { mother_id?: string, father_id?: string, father_type?: 'bull'|'semen', is_birth?: boolean } || {};
  
  const addAnimal = useStore(state => state.addAnimal);
  
  const [formData, setFormData] = useState({
    id_interno: '',
    name: '',
    earring_number: '',
    rfid: '',
    birth_date: state.is_birth ? new Date().toISOString().split('T')[0] : '',
    sex: 'Fêmea',
    breed: 'Holandesa',
    coat: '',
    category: state.is_birth ? 'Bezerra' : 'Vaca',
    status: state.is_birth ? 'Recria' : 'Lactante',
    entry_date: new Date().toISOString().split('T')[0], // Default to today
    origin: state.is_birth ? 'Nascida na propriedade' : 'Nascida na propriedade',
    batch: '',
    location: '',
    notes: '',
    weight: '',
    mother_id: state.mother_id || '',
    father_id: state.father_id || '',
    father_type: state.father_type || 'bull'
  });

  const animals = useStore(state => state.animals);
  const semenInventory = useStore(state => state.semenInventory);
  const possibleMothers = animals.filter(a => a.sex === 'Fêmea');
  const possibleFathers = animals.filter(a => a.sex === 'Macho');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newAnimal: Animal = {
        id: uuidv4(),
        id_interno: formData.id_interno || `ANM-${Math.floor(1000 + Math.random() * 9000)}`, // Auto generate if empty
        name: formData.name,
        earring_number: formData.earring_number,
        rfid: formData.rfid,
        birth_date: formData.birth_date ? formData.birth_date : null,
        sex: formData.sex,
        breed: formData.breed,
        coat: formData.coat,
        category: formData.category,
        status: formData.status,
        photo_url: '', // Foto implementaremos depois
        entry_date: formData.entry_date ? formData.entry_date : null,
        origin: formData.origin,
        batch: formData.batch,
        location: formData.location,
        notes: formData.notes,
        mother_id: formData.mother_id || undefined,
        father_id: formData.father_id || undefined,
        father_type: formData.father_type,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        summary: {
          last_weight: formData.weight ? parseFloat(formData.weight) : null,
        }
      };
      addAnimal(newAnimal);
      
      // Se foi um parto, registra o evento na mãe e muda status dela
      if (state.is_birth && formData.mother_id) {
        useStore.getState().addReproductionEvent({
          id: uuidv4(),
          animal_id: formData.mother_id,
          type: 'parto',
          date: formData.birth_date || new Date().toISOString().split('T')[0],
          calf_id: newAnimal.id,
          created_at: new Date().toISOString()
        });
        // A mãe volta a ser Lactante
        useStore.getState().updateAnimal(formData.mother_id, { status: 'Lactante' });
      }

      alert('Animal cadastrado localmente com sucesso!');
      navigate('/rebanho');
    } catch (error) {
      console.error("Erro ao adicionar animal: ", error);
      alert('Erro ao cadastrar animal.');
    }
  };

  const inputStyle = { padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--border)', fontSize: '14px', background: '#fff' };
  const labelStyle = { fontSize: '13px', fontWeight: 600, color: 'var(--text)' };
  const fieldGroupStyle = { display: 'flex', flexDirection: 'column' as const, gap: '6px' };
  const gridStyle = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '20px' };

  return (
    <div className="cadastro-container" style={{ maxWidth: '900px', margin: '0 auto', background: '#fff', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px', gap: '12px', borderBottom: '1px solid var(--border-light)', paddingBottom: '16px' }}>
        <button 
          onClick={() => navigate('/rebanho')}
          style={{ background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '8px', borderRadius: '50%' }}
        >
          <ArrowLeft size={20} color="var(--text)" />
        </button>
        <div>
          <h2 style={{ margin: 0, fontSize: '20px', color: 'var(--text)' }}>Cadastrar Identificação do Animal</h2>
          <p style={{ margin: 0, fontSize: '14px', color: 'var(--text-secondary)' }}>Preencha os dados permanentes de identificação no rebanho.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        
        <h3 style={{ fontSize: '15px', color: 'var(--green-dark)', margin: '10px 0 5px 0' }}>1. Identificadores Básicos</h3>
        <div style={gridStyle}>
          <div style={fieldGroupStyle}>
            <label style={labelStyle}>ID Interno</label>
            <input type="text" name="id_interno" value={formData.id_interno} onChange={handleChange} style={inputStyle} placeholder="Ex: VAC-0025 (Automático se vazio)" />
          </div>
          <div style={fieldGroupStyle}>
            <label style={labelStyle}>Nome</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} style={inputStyle} placeholder="Ex: Mimosa" />
          </div>
          <div style={fieldGroupStyle}>
            <label style={labelStyle}>Brinco *</label>
            <input type="text" name="earring_number" value={formData.earring_number} onChange={handleChange} required style={inputStyle} placeholder="Ex: 125" />
          </div>
          <div style={fieldGroupStyle}>
            <label style={labelStyle}>RFID</label>
            <input type="text" name="rfid" value={formData.rfid} onChange={handleChange} style={inputStyle} placeholder="Ex: 982000123456789" />
          </div>
        </div>

        <h3 style={{ fontSize: '15px', color: 'var(--green-dark)', margin: '10px 0 5px 0' }}>2. Características Físicas</h3>
        <div style={gridStyle}>
          <div style={fieldGroupStyle}>
            <label style={labelStyle}>Raça *</label>
            <select name="breed" value={formData.breed} onChange={handleChange} style={inputStyle}>
              <option value="Holandesa">Holandesa</option>
              <option value="Jersey">Jersey</option>
              <option value="Girolando">Girolando</option>
              <option value="Nelore">Nelore</option>
              <option value="Angus">Angus</option>
              <option value="Mestiça">Mestiça</option>
              <option value="Outra">Outra</option>
            </select>
          </div>
          <div style={fieldGroupStyle}>
            <label style={labelStyle}>Pelagem</label>
            <input type="text" name="coat" value={formData.coat} onChange={handleChange} style={inputStyle} placeholder="Ex: Parda, Preta e Branca" />
          </div>
          <div style={fieldGroupStyle}>
            <label style={labelStyle}>Sexo *</label>
            <select name="sex" value={formData.sex} onChange={handleChange} style={inputStyle}>
              <option value="Fêmea">Fêmea</option>
              <option value="Macho">Macho</option>
            </select>
          </div>
          <div style={fieldGroupStyle}>
            <label style={labelStyle}>Data de Nascimento</label>
            <input type="date" name="birth_date" value={formData.birth_date} onChange={handleChange} style={inputStyle} />
          </div>
        </div>

        <h3 style={{ fontSize: '15px', color: 'var(--green-dark)', margin: '10px 0 5px 0' }}>3. Manejo e Localização</h3>
        <div style={gridStyle}>
          <div style={fieldGroupStyle}>
            <label style={labelStyle}>Categoria *</label>
            <select name="category" value={formData.category} onChange={handleChange} style={inputStyle}>
              <option value="Vaca">Vaca</option>
              <option value="Novilha">Novilha</option>
              <option value="Bezerra">Bezerra</option>
              <option value="Bezerro">Bezerro</option>
              <option value="Touro">Touro</option>
              <option value="Garrote">Garrote</option>
            </select>
          </div>
          <div style={fieldGroupStyle}>
            <label style={labelStyle}>Status Atual *</label>
            <select name="status" value={formData.status} onChange={handleChange} style={inputStyle}>
              <option value="Lactante">Lactante</option>
              <option value="Seca">Seca</option>
              <option value="Inseminada">Inseminada</option>
              <option value="Prenhe">Prenhe</option>
              <option value="Apta">Apta à reprodução</option>
              <option value="Tratamento">Em Tratamento</option>
              <option value="Recria">Recria / Crescimento</option>
            </select>
          </div>
          <div style={fieldGroupStyle}>
            <label style={labelStyle}>Lote / Grupo</label>
            <input type="text" name="batch" value={formData.batch} onChange={handleChange} style={inputStyle} placeholder="Ex: Lactação 1" />
          </div>
          <div style={fieldGroupStyle}>
            <label style={labelStyle}>Localização (Piquete)</label>
            <input type="text" name="location" value={formData.location} onChange={handleChange} style={inputStyle} placeholder="Ex: Piquete 3" />
          </div>
        </div>

        <h3 style={{ fontSize: '15px', color: 'var(--green-dark)', margin: '10px 0 5px 0' }}>4. Genealogia</h3>
        <div style={gridStyle}>
          <div style={fieldGroupStyle}>
            <label style={labelStyle}>Mãe</label>
            <select name="mother_id" value={formData.mother_id} onChange={handleChange} style={inputStyle}>
              <option value="">Desconhecida / Não cadastrada</option>
              {possibleMothers.map(m => (
                <option key={m.id} value={m.id}>{m.earring_number} {m.name ? `- ${m.name}` : ''}</option>
              ))}
            </select>
          </div>
          <div style={fieldGroupStyle}>
            <label style={labelStyle}>Pai (Touro ou Sêmen)</label>
            <select 
              name="father_id" 
              value={formData.father_id} 
              onChange={(e) => {
                const isSemen = e.target.options[e.target.selectedIndex].dataset.type === 'semen';
                setFormData(prev => ({ ...prev, father_id: e.target.value, father_type: isSemen ? 'semen' : 'bull' }));
              }} 
              style={inputStyle}
            >
              <option value="" data-type="bull">Desconhecido / Não cadastrado</option>
              <optgroup label="Touros do Rebanho">
                {possibleFathers.map(f => (
                  <option key={f.id} value={f.id} data-type="bull">{f.earring_number} {f.name ? `- ${f.name}` : ''}</option>
                ))}
              </optgroup>
              <optgroup label="Estoque de Sêmen">
                {semenInventory.map(s => (
                  <option key={s.id} value={s.id} data-type="semen">{s.short_name} ({s.breed}) - {s.supplier}</option>
                ))}
              </optgroup>
            </select>
          </div>
        </div>

        <h3 style={{ fontSize: '15px', color: 'var(--green-dark)', margin: '10px 0 5px 0' }}>5. Origem e Informações Adicionais</h3>
        <div style={gridStyle}>
          <div style={fieldGroupStyle}>
            <label style={labelStyle}>Data de Entrada</label>
            <input type="date" name="entry_date" value={formData.entry_date} onChange={handleChange} style={inputStyle} />
          </div>
          <div style={fieldGroupStyle}>
            <label style={labelStyle}>Origem</label>
            <input type="text" name="origin" value={formData.origin} onChange={handleChange} style={inputStyle} placeholder="Ex: Nascida na propriedade" />
          </div>
          <div style={fieldGroupStyle}>
            <label style={labelStyle}>Peso Atual (kg)</label>
            <input type="number" name="weight" value={formData.weight} onChange={handleChange} style={inputStyle} placeholder="Ex: 450" />
          </div>
        </div>
        
        <div style={fieldGroupStyle}>
          <label style={labelStyle}>Observações / Marcas Físicas</label>
          <textarea 
            name="notes" 
            value={formData.notes} 
            onChange={handleChange} 
            style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }} 
            placeholder="Ex: Mancha branca na testa. Sem chifres." 
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '16px', borderTop: '1px solid var(--border-light)', paddingTop: '20px' }}>
          <button 
            type="button" 
            onClick={() => navigate('/rebanho')}
            style={{ 
              padding: '10px 16px', 
              borderRadius: '8px', 
              border: '1px solid var(--border)', 
              background: '#fff', 
              cursor: 'pointer', 
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <X size={16} /> Cancelar
          </button>
          
          <button 
            type="submit"
            style={{ 
              padding: '10px 24px', 
              borderRadius: '8px', 
              border: 'none', 
              background: 'var(--green-primary)', 
              color: '#fff', 
              cursor: 'pointer', 
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Save size={16} /> Salvar Ficha do Animal
          </button>
        </div>
        
      </form>
    </div>
  );
}
