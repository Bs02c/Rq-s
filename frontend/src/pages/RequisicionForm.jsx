import { useState, useEffect } from 'react';
import { createRq } from '../services/requisicion.service.js';
import { searchProducts } from '../services/product.service.js';

function RequisicionForm() {
    const [form, setForm] = useState({
        solicitante:       '',
        repartidor:        '',
        destino:           '',
        codigo_solicitado: '',
        cantidad:          '',
        observaciones:     '',
    });

    const [searchQuery,   setSearchQuery]   = useState('');
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        if (searchQuery.trim() === '') {
            setSearchResults([]);
            return;
        }
        searchProducts(searchQuery)
            .then(setSearchResults)
            .catch(() => setSearchResults([]));
    }, [searchQuery]);

    function handleChange(e) {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    }

    function handleSelectProduct(product) {
        setForm(prev => ({ ...prev, codigo_solicitado: product.codigo }));
        setSearchQuery('');
        setSearchResults([]);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const payload = {
            ...form,
            cantidad: Number(form.cantidad),
        };
        try {
            const result = await createRq(payload);
            console.log('Requisición creada:', result);
        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input name="solicitante"   value={form.solicitante}   onChange={handleChange} placeholder="Solicitante" />
            <input name="repartidor"    value={form.repartidor}    onChange={handleChange} placeholder="Repartidor" />
            <input name="destino"       value={form.destino}       onChange={handleChange} placeholder="Destino" />
            <input name="cantidad"      value={form.cantidad}      onChange={handleChange} placeholder="Cantidad" type="number" />
            <input name="observaciones" value={form.observaciones} onChange={handleChange} placeholder="Observaciones" />

            <div>
                <input
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Buscar repuesto por código o nombre..."
                />
                {form.codigo_solicitado && (
                    <span>Seleccionado: {form.codigo_solicitado}</span>
                )}
                {searchResults.length > 0 && (
                    <ul>
                        {searchResults.map(p => (
                            <li key={p.codigo} onClick={() => handleSelectProduct(p)}>
                                {p.codigo} — {p.nombre}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <button type="submit">Crear requisición</button>
        </form>
    );
}

export { RequisicionForm };
